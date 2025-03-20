import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import YearPicker from "../components/YearPicker";

export const DataSearch = () => {

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // State to store the selected indicadores
    const [selectedIndicadoresList, setSelectedIndicadoresList] = useState([]);

    // State to store indicadores
    const [indicadores, setIndicadores] = useState([]);

    console.log(indicadores);
    console.log(selectedIndicadoresList);

    // State to store the min and max years
    const [minMaxYears, setMinMaxYears] = useState([]);

    const [options, setOptions] = useState([]);

    // State to store the data from the API
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    // State to store the filters
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [idIndicador, setIdIndicador] = useState("");

    // API URL
    const apiUrl = "https://invelecar-backend.onrender.com/data";


    // useEffect to get all the years and indicadores when the data changes
    useEffect(() => { getAllYears(); getIndicadores(); getAllPaises(); }, [data])

    // Handle the select all checkbox for the indicadores
    const handleSelectAllIndicadores = (event) => {
        if (event.target.checked) {
            setSelectedIndicadoresList(indicadores.map((indicador) => indicador.id));
        } else {
            setSelectedIndicadoresList([]);
        }
    };

    // Handle the change event for the indicadores
    const handleIndicadorChange = (id) => (event) => {
        if (event.target.checked) {
            setSelectedIndicadoresList([...selectedIndicadoresList, id]);
        } else {
            setSelectedIndicadoresList(selectedIndicadoresList.filter((item) => item !== id));
        }
    };

    // Fetch data from the API
    const fetchData = async () => {
        setLoader(true);
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const responseJson = await response.json();
            setData(responseJson);
            setLoader(false);
            getAllYears();
        } catch (error) {
            setLoader(false);
            console.log("error: ", error);
        }
    }

    // Function to format a number with two decimal places
    function formatNumber(numberString) {
        const number = parseFloat(numberString);

        if (isNaN(number)) {
            return numberString; // Return the original string if it's not a valid number
        }

        return number.toLocaleString('es-VE', { // 'es-VE' for Venezuelan Spanish locale
            minimumFractionDigits: 2, // Ensure at least two decimal places
            maximumFractionDigits: 2, // Ensure at most two decimal places
        });
    }

    // Filter the data based on the selected filters
    const filteredData = data.filter(item => {
        const isCountryMatch = selectedCountries.length === 0 || selectedCountries.includes(item.pais);
        const isStartYearMatch = !startYear || item.anno >= parseInt(startYear);
        const isEndYearMatch = !endYear || item.anno <= parseInt(endYear);
        const isIdIndicadorMatch = selectedIndicadoresList.length === 0 || selectedIndicadoresList.includes(item.id_indicador);
        return isCountryMatch && isStartYearMatch && isEndYearMatch && isIdIndicadorMatch;
    });

    // Group the data by pais and sort each group by anno
    const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.pais]) {
            acc[item.pais] = [];
        }
        acc[item.pais].push(item);
        return acc;
    }, {});

    const sortedGroupedData = Object.values(groupedData).flatMap(group => {
        return group.sort((a, b) => a.anno - b.anno);
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedGroupedData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(sortedGroupedData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // check if all filters are applied
    const areFiltersApplied = selectedCountries.length > 0 || startYear || endYear;

    // Get all the years from the data and set the min and max years
    const getAllYears = () => {
        const years = [];
        data.forEach(item => {
            if (!years.includes(item.anno)) {
                years.push(item.anno);
            }
        });
        years.sort((a, b) => a - b);

        const minYear = years[0];
        const maxYear = years[years.length - 1];
        setMinMaxYears([minYear, maxYear]);
        setStartYear(minYear);
        setEndYear(maxYear);
    };

    // Get all the indicadores from the data and set the indicadores state
    const getIndicadores = () => {
        const indicadores = [];
        const seenIds = new Set();
        data.forEach(item => {
            if (!seenIds.has(item.id_indicador)) {
                seenIds.add(item.id_indicador);
                indicadores.push({ id: item.id_indicador, descripcion: item.descripcion_indicador });
            }
        });
        indicadores.sort((a, b) => a.id - b.id);
        setIndicadores(indicadores);
    };

    const getAllPaises = () => {
        const paises = [];
        data.forEach(item => {
            if (!paises.includes(item.pais)) {
                paises.push(item.pais);
            }
        });
        paises.sort((a, b) => a - b);
        setOptions(paises);
        setSelectedCountries(paises);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedCountries(options);
        } else {
            setSelectedCountries([]);
        }
    };

    const handleOptionChange = (option) => (event) => {
        if (event.target.checked) {
            setSelectedCountries([...selectedCountries, option]);
        } else {
            setSelectedCountries(selectedCountries.filter((item) => item !== option));
        }
    };

    const handleDateRangeChange = (range) => {
        setStartYear(range[0] ? range[0].getFullYear() : "");
        setEndYear(range[1] ? range[1].getFullYear() : "");
        console.log(range);
    };

    // Build a sorted list of all 'anno' values in your *entire* filtered data
    const yearsInSecondTable = [...new Set(sortedGroupedData.map(item => item.anno))].sort((a, b) => a - b);

    // Group data by pais + id_indicador from the *entire* sortedGroupedData
    const groupedDataSecondTable = sortedGroupedData.reduce((acc, item) => {
        const key = `${item.pais}-${item.id_indicador}`;
        if (!acc[key]) {
            acc[key] = {
                pais: item.pais,
                descripcion_indicador: item.descripcion_indicador,
                unidad_medida: item.unidad_medida,
                data: {}
            };
        }
        acc[key].data[item.anno] = item.cantidad;
        return acc;
    }, {});

    const secondTableRows = Object.values(groupedDataSecondTable);

    const renderPaginationButtons = () => {
        const maxButtons = 10;
        const buttons = [];

        if (totalPages <= maxButtons * 2) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        } else {
            for (let i = 1; i <= maxButtons; i++) {
                buttons.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }

            buttons.push(
                <li key="ellipsis1" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );

            for (let i = totalPages - maxButtons + 1; i <= totalPages; i++) {
                buttons.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        }

        return buttons;
    };

    return (
        <div className="vh-100 align-items-center">
            <Loader visible={loader} />
            <h1 className="text-center mt-4">Buscar datos</h1>
            <div className="row px-5">
                <div className="col-md-4">
                    <label htmlFor="dropdown-menu" className="form-label">
                        <strong>País</strong>
                    </label>
                    <div className="dropdown" id="dropdown-menu">
                        <button
                            className="btn text-start btn-primary w-100 dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Seleccionados: {selectedCountries.length === options.length ? "Todos" : selectedCountries.join(", ")}
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                            <li>
                                <div className="form-check dropdown-item ps-5">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="selectAll"
                                        checked={selectedCountries.length === options.length}
                                        onChange={handleSelectAll}
                                    />
                                    <label className="form-check-label" htmlFor="selectAll">
                                        Seleccionar todos
                                    </label>
                                </div>
                            </li>
                            {options.map((option) => (
                                <li key={option}>
                                    <div className="form-check dropdown-item ps-5">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={option}
                                            checked={selectedCountries.includes(option)}
                                            onChange={handleOptionChange(option)}
                                        />
                                        <label className="form-check-label" htmlFor={option}>
                                            {option}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 d-flex flex-column">
                    <label className="form-label" htmlFor="year-picker">
                        <strong className="mb-2">Años</strong>
                    </label>
                    <YearPicker
                        id="year-picker"
                        minDate={new Date(minMaxYears[0], 0, 1)}
                        maxDate={new Date(minMaxYears[1], 0, 1)}
                        onRangeChange={handleDateRangeChange}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="dropdown-menu-indicadores" className="form-label">
                        <strong>Indicadores</strong>
                    </label>
                    <div className="dropdown" id="dropdown-menu-indicadores">
                        <button
                            className="btn text-start btn-primary w-100 dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Seleccionados: {selectedIndicadoresList.length}
                        </button>
                        <ul className="dropdown-menu w-100">
                            <li>
                                <div className="form-check dropdown-item ps-5">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="selectAllIndicadores"
                                        checked={selectedIndicadoresList.length === indicadores.length}
                                        onChange={handleSelectAllIndicadores}
                                    />
                                    <label className="form-check-label" htmlFor="selectAllIndicadores">
                                        Seleccionar todos
                                    </label>
                                </div>
                            </li>
                            {indicadores.map((indicador) => (
                                <li key={indicador.id}>
                                    <div className="form-check dropdown-item ps-5">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`indicador-${indicador.id}`}
                                            checked={selectedIndicadoresList.includes(indicador.id)}
                                            onChange={handleIndicadorChange(indicador.id)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`indicador-${indicador.id}`}
                                        >
                                            {indicador.descripcion}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <h2 className="text-center mt-5">Opción 1</h2>
            {areFiltersApplied && (
                <div className="container border border-2 px-3 mt-5 rounded-3">
                    <nav>
                        <ul className="pagination justify-content-center mt-3">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
                            </li>
                            {renderPaginationButtons()}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
                            </li>
                        </ul>
                    </nav>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>País</th>
                                <th>Año</th>
                                <th>Descripción</th>
                                <th>Unidad de medida</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.pais}</td>
                                    <td>{item.anno}</td>
                                    <td>{item.descripcion_indicador}</td>
                                    <td>{item.unidad_medida}</td>
                                    <td>{formatNumber(item.cantidad)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
                            </li>
                            {renderPaginationButtons()}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
                            </li>
                        </ul>
                    </nav>
                </div>

            )}
            <h2 className="text-center mt-5">Opción 2</h2>
            <div className="container border border-2 px-3 mt-5 rounded-3">
                <div style={{ overflowX: "auto" }}>
                    <table className="table table-striped second-table">
                        <thead>
                            <tr>
                                <th>País</th>
                                <th className="no-wrap">Descripción</th>
                                <th className="no-wrap">Unidad de medida</th>
                                {yearsInSecondTable.map(year => (
                                    <th key={year}>{year}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {secondTableRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.pais}</td>
                                    <td className="no-wrap">{row.descripcion_indicador}</td>
                                    <td>{row.unidad_medida}</td>
                                    {yearsInSecondTable.map(year => (
                                        <td key={year}>{row.data[year] ? formatNumber(row.data[year]) : ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}