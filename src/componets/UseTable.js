import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TablePagination,
    TableSortLabel,
    Toolbar, InputAdornment
} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {getPostsData} from "../actions/actionsPosts";
import Controls from "../componets/controls/Controls";

//Styles table
const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    },
    searchInput: {
        width: '75%'
    }
}))

//Компонент Таблица
const UseTable = () => {

    //Импорт стилей для таблицы
    const classes = useStyles();

    //Параметры пагинации
    const pages = [10, 50, 75];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    //Для сортировки
    const [post, setPost] = useState("");
    const [postBy, setPostBy] = useState();

    //Для поиска
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });

    //Для построения заголовков таблицы
    const [headCell] = useState([
        {
            id: 'id', cellName: "id"
        },
        {
            id: "idPosts", cellName: "idPosts"
        },
        {
            id: "title", cellName: "title"
        },
        {
            id: "body", cellName: "body"
        }
    ]);

    const postsSuccess = useSelector(state => state.postsReducer.postsSuccess); //Данные posts

    const dispatch = useDispatch();

    //Запрос данных
    useEffect(() => {
        dispatch(getPostsData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Сортировка столбцов
    function stableSort(array, comparator) {
        if (array) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
                const post = comparator(a[0], b[0]);
                if (post !== 0) return post;
                return a[1] - b[1];
            });
            return stabilizedThis.map((el) => el[0]);
        }
    }

    //Сортировка столбцов
    function getComparator(post, postBy) {
        return post === 'desc'
            ? (a, b) => descendingComparator(a, b, postBy)
            : (a, b) => -descendingComparator(a, b, postBy);
    }

    //Сортировка столбцов
    function descendingComparator(a, b, postBy) {
        if (b[postBy] < a[postBy]) {
            return -1;
        }
        if (b[postBy] > a[postBy]) {
            return 1;
        }
        return 0;
    }

    //Head table
    const TblHead = () => {

        //Клик по кнопке Сортировки
        const handleSortRequest = (cellId) => {
            const isAsc = postBy === cellId && post === "asc";
            setPost(isAsc ? 'desc' : 'asc')
            setPostBy(cellId)
        }

        return (
            <TableHead>
                <TableRow>
                    {headCell.map(headCell => (
                        <TableCell
                            key={headCell.id}
                            sortDirection={postBy === headCell.id ? post : false}>
                            <TableSortLabel
                                active={postBy === headCell.id}
                                direction={postBy === headCell.id ? post : 'asc'}
                                onClick={() => { handleSortRequest(headCell.id) }}
                            >
                                {headCell.cellName}
                            </TableSortLabel>
                        </TableCell>)
                    )}
                </TableRow>
            </TableHead>
        )
    }

    //Для пагинации
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    //Для пагинации
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    //Пагинация
    const TblPagination = () => (
        <TablePagination
            component="div"
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={postsSuccess.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )

    //Для сортировки при выборе пагинации или сортировки по клику на кнопку в столбце
    //Вместо state filterFn - если не нужен поиск, указываем postsSuccess
    const postsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(postsSuccess), getComparator(post, postBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    //Если нет поиска можно просто писать так:
    /*const postsAfterPagingAndSorting = () => {
        return stableSort(postsSuccess, getComparator(post, postBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }*/

    //Таблица
    const TblContainer = () => {
        if (postsSuccess) {
            return (
                <Table className={classes.table}>
                    <TblHead />
                    <TableBody>
                        {
                            postsAfterPagingAndSorting().map((item, index) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.userId}</TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.body}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TblPagination />
                </Table>
            )
        }
    }

    //Поиск (items = данные из postsSuccess)
    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn:items => {
                if (target.value === "") {
                    return items;
                }
                else {
                    return items.filter(x => x.title.toLowerCase().includes(target.value)); //title - это данные по которым фильтруем
                }
            }
        });
    }

    return (
        <>
            <Toolbar>
                <Controls.Input
                    label="Search Posts"
                    onChange={handleSearch}
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        )
                    }}
                />
            </Toolbar>
            {TblContainer()}
        </>
    )

}

export default UseTable;