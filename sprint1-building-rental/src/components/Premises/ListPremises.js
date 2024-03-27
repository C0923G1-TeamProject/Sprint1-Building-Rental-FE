import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import * as service from "../../service/PremisesService";
import ReactPaginate from "react-paginate";

export default function ListPremises(){
    // const navigate = useNavigate();
    // useEffect(() => {
    //
    // })
    const [premisesList, setPremisesList] = useState([]);
    const [floor, setFloor] = useState("");
    const [code, setCode] = useState("");
    const [area, setArea] = useState(99999);
    const [premisesName, setPremisesName] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchApi = async(floor, code, area, premisesName, page) => {
            try{
                const result = await service.getAllPremises(floor, code, area,premisesName, page);
                console.log(result);
                setPremisesList(result.content);
                setTotalPages(result.totalPages);
                document.title = "Danh sách mặt bằng"
            }catch(e){
                console.log(e);
            }
        };
        fetchApi(floor,code,area,premisesName,0);
    }, []);

    const handleFloor = (value) => {
        setFloor(value);
    };

    const handleCode = (value) => {
        setCode((value))
    };

    const handleArea = (value) => {
        setArea(value);
    };

    const handlePremisesName = (value) => {
        setPremisesName(value);
    }

    const submitSearch = async () =>{
        try{
            let res = await service.getAllPremises(floor,code, area,premisesName,);
            setPremisesList(res.content);
            setTotalPages(res.totalPages);
            setCurrentPage(0);
        }catch(e){
            console.log(e);
        }
    }

    const handlePageClick = async (event) =>{
        try{
            const pageNumber = event.selected;
            setCurrentPage(pageNumber);
            const result = await service.getAllPremises(floor,code, area, premisesName);
            setPremisesList(result.content);
            setTotalPages(result.totalPages);
        }catch(e){
            console.log(e);
        }
    }


}