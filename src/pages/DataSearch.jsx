import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

export const DataSearch = () => {

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // API URL
    const apiUrl = "https://invelecar-backend.onrender.com/data";

    // State to store the data from the API
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    // State to store the filters
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");

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
        } catch (error) {
            setLoader(false);
            console.log("error: ", error);
        }
    }

    // Filter the data based on the selected filters
    const filteredData = data.filter(item => {
        const isCountryMatch = selectedCountries.length === 0 || selectedCountries.includes(item.pais);
        const isStartYearMatch = !startYear || item.anno >= parseInt(startYear);
        const isEndYearMatch = !endYear || item.anno <= parseInt(endYear);
        return isCountryMatch && isStartYearMatch && isEndYearMatch;
    });

    filteredData.sort((a, b) => a.anno - b.anno);

    // check if all filters are applied
    const areFiltersApplied = selectedCountries.length > 0 && startYear && endYear;


    // Select options
    const options = ['VENEZUELA', 'ARGENTINA'];

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
                            Seleccionar paises
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
                                        Select all
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
                <div className="col-md-4">
                    <label htmlFor="startYear" className="form-label">
                        <strong>Año inicio</strong>
                    </label>
                    <input type="number" className="form-control" id="startYear" value={startYear} onChange={(e) => setStartYear(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <label htmlFor="endYear" className="form-label">
                        <strong>Año fin</strong>
                    </label>
                    <input type="number" className="form-control" id="endYear" value={endYear} onChange={(e) => setEndYear(e.target.value)} />
                </div>
            </div>
            {areFiltersApplied && (
                <div className="container border border-2 px-3 mt-5 rounded-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Año</th>
                                <th>País</th>
                                <th>Descripción</th>
                                <th>Unidad de medida</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.anno}</td>
                                    <td>{item.pais}</td>
                                    <td>{item.descripcion_indicador}</td>
                                    <td>{item.unidad_medida}</td>
                                    <td>{item.cantidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}