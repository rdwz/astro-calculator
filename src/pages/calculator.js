
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';



import "../index.css";
import launch from "../assets/images/launch.svg";
import wait from "../assets/images/undraw_season_change_f99v.svg";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox,
    MDBSelect, MDBCardTitle, MDBCardHeader, MDBFooter
}
    from 'mdb-react-ui-kit';

import axios from "axios";
import {toast} from "react-toastify";
import Loading from "../components/Loading";
import {Wrapper} from "./landing";
import Result from "../components/result";
import Footer from "../components/footer";
import ProjectInfo from "../components/ProjectInfo";
import {GoLocation} from "react-icons/go";
import {GrMapLocation} from "react-icons/gr";
import {BiTimeFive } from "react-icons/bi";
import {BsCalendarDate, BsMap } from "react-icons/bs";


function Calculator() {
    const [jour, setJour] = useState('');
    const [mois, setMois] = useState('');
    const [annee, setAnnee] = useState('');
    const [heure, setHeure] = useState('');
    const [minute, setMinute] = useState('');
    const [ville, setVille] = useState('');
    const [moonTitle, setMoonTitle] = useState('');
    const [moonContent, setMoonContent] = useState('');
    const [houseTitle, setHouseTitle] = useState('');
    const [houseContent, setHouseContent] = useState('');
    const [isLoading, setIsLoading]=useState(false);
    const [resultReady, setResultReady]=useState(false);
    const [moonImg, setMoonImg]=useState("");
    const [houseImg, setHouseImg]=useState("");
    const [state, setState]=useState("");
    const [coord, setCoord]=useState("");









    const moisOptions = [    { value: '1', label: 'Janvier' },    { value: '2', label: 'Février' },    { value: '3', label: 'Mars' },    { value: '4', label: 'Avril' },    { value: '5', label: 'Mai' },    { value: '6', label: 'Juin' },    { value: '7', label: 'Juillet' },    { value: '8', label: 'Août' },    { value: '9', label: 'Septembre' },    { value: '10', label: 'Octobre' },    { value: '11', label: 'Novembre' },    { value: '12', label: 'Décembre' }  ];


    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data, such as send it to a server
        console.log({ jour, mois, annee, heure, minute, ville });
        if (!jour || !mois ||!annee ||!heure ||!minute ||!ville)
        {
            toast.error("veuillez remplir tous les champs");
            return;
        }




    let latitudeDegrees = 34;

    let longitudeDegrees = 6;
    let country="Morocco";



    // get coordinates
    const options = {
        method: 'GET',
        url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward',
        params: {

            city: ville,

        },
        headers: {
            'X-RapidAPI-Key': '9dcf2ed61dmshd96dd8a8927e761p1c5fa6jsnabd200c3c1fd',
            'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        const data = response.data[0];
        console.log(data)
        longitudeDegrees=Math.floor(Math.abs(data.lon));
        latitudeDegrees =Math.floor(Math.abs(data.lat));
        country = data.display_name.split(", ").pop();
        console.log("long : " + longitudeDegrees);
        console.log("lat : " + latitudeDegrees);
        console.log("country : " + country);
        setState(country);
        setCoord("lattitude : "+latitudeDegrees + " , longitude : "+ longitudeDegrees)

    }).catch(function (error) {
        console.error(error);
        //toast.error("il y a eu une erreur du serveur");
    });


    const link =`https://horoscopes.astro-seek.com/calculate-birth-chart-horoscope-online/?send_calculation=1&narozeni_den=${jour}&narozeni_mesic=${mois}&narozeni_rok=${annee}&narozeni_hodina=${heure}&narozeni_minuta=${minute}&narozeni_city=&narozeni_mesto_hidden=&narozeni_stat_hidden=&narozeni_podstat_kratky_hidden=&narozeni_podstat_hidden=&narozeni_input_hidden=&narozeni_podstat2_kratky_hidden=&narozeni_podstat3_kratky_hidden=&narozeni_sirka_stupne=${latitudeDegrees}&narozeni_sirka_minuty=14&narozeni_sirka_smer=0&narozeni_delka_stupne=${longitudeDegrees}&narozeni_delka_minuty=21&narozeni_delka_smer=1&narozeni_timezone_form=auto&narozeni_timezone_dst_form=auto`

        console.log(link)
        const dataLink = {
        link:link

    };
    const promise = axios.post("https://astroseek-api.onrender.com/astroseek-bith-chart-calculator/v2"/*"/api"*/ ,dataLink )
        setIsLoading(true);
// Handle the pending, fulfilled, and rejected cases
    promise.then((response) => {
        setIsLoading(false);
        const data = response.data;



         setMoonTitle (data["lilith-zodiac-title"]);
        setMoonContent(data["lilith-zodiac-content"]);
        setHouseContent(data["lilith-house-content"]);
         setHouseTitle(data["lilith-house-title"]);
/*
         setHouseImg(data["moon-in-the-house-image"]);
         setMoonImg(data["moon-sign-image"]);*/
        //setMoonContent(data["lilith-text"]);
        setResultReady(true);

    }).catch((error) => {
        setIsLoading(false);
        toast.error("il y a eu une erreur du serveur");
        console.error('POST request failed:', error);
    }).finally(() => {
        setIsLoading(false);
    });

console.log("moon : "+ moonTitle);

    };

    if (isLoading) {
        return (
    <main className="page">
        <MDBContainer fluid style={{marginTop:"6%"}} className="size-adjust2">

            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardHeader style={{ marginTop:"2%", marginBottom:"2%", display:"flex"}}>

                    <h4 style={{marginLeft:"10%", color:"#341f97"}}>
                        Résultat dans quelques secondes ...
                    </h4>
                    <Loading />

                </MDBCardHeader>
                <MDBCardBody>
                    <MDBRow  >
                        <MDBCol md='10' lg='6' style={{ marginBottom:"1%"}} >
                            <div className="content-center" style={{marginLeft:"15%"}}>
                                <ProjectInfo icon={<BsCalendarDate />} text={jour + "/" + mois+"/"+annee} />
                                <ProjectInfo icon={<BiTimeFive />} text={heure + " Heure , "+minute +" Minutes"} />
                                <ProjectInfo icon={<GoLocation />} text={`${ville} , ${state} ` }  />
                                <ProjectInfo icon={<BsMap />} text={coord} />
                            </div>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src={wait} fluid style={{maxWidth:"70%"}}/>

                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer >
        <div style={{flexShrink:"0", marginTop:"17%", marginBottom:"0"}}>
            <Footer />
        </div>

    </main>);


    }
    if (!resultReady) return (



        <main className="page">



        <MDBContainer fluid style={{marginTop:"6%"}} className="size-adjust">

            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardHeader>
                <MDBCardTitle style={{marginLeft:"10%", marginTop:"2%", marginBottom:"2%"}}>
                    Entrer vos données de naissance!
                </MDBCardTitle>
                </MDBCardHeader>
                <MDBCardBody>
                    <MDBRow >
                        <MDBCol md='10' lg='6' style={{marginTop:"1%"}} >
                            <Form onSubmit={handleSubmit} >


                                <MDBRow>

                                    <MDBCol md='6'style={{marginTop:"6%"}}>

                                            {/*<Form.Label style={{marginRight:"5%"}}>Jour </Form.Label>*/}

                                            <Form.Control as="select" value={jour} onChange={(event) => setJour(event.target.value)}  placeholder="jour">
                                                <option value="" key={-1} style={{ color: "gray" }} disabled>
                                                    jour
                                                </option>
                                                {[...Array(31)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                                            </Form.Control>



                                    </MDBCol>

                                    <MDBCol md='6' style={{marginTop:"6%"}}>

                                            {/*<Form.Label style={{marginRight:"5%"}}>Mois</Form.Label>*/}
                                            <Form.Control as="select" value={mois} onChange={(event) => setMois(event.target.value)}  >
                                                <option value="" key={-1} style={{ color: "gray" }} disabled>
                                                    mois
                                                </option>
                                                {moisOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                            </Form.Control>

                                    </MDBCol>


                                </MDBRow>


                                <MDBRow >
                                    <MDBCol md='6' style={{marginTop:"6%"}}>

                                            {/*<Form.Label style={{marginRight:"5%"}}>Année</Form.Label>*/}
                                            <Form.Control as="select" value={annee} onChange={(event) => setAnnee(event.target.value)} >
                                                <option value="" key={-1} style={{ color: "gray" }} disabled>
                                                    année
                                                </option>
                                                {[...Array(123)].map((_, i) => <option key={i + 1900} value={i + 1900}>{i + 1900}</option>)}
                                            </Form.Control>

                                    </MDBCol>
                                    <MDBCol md='6' style={{marginTop:"6%"}}>


                                           {/* <Form.Label style={{marginRight:"5%"}}>Heure</Form.Label>*/}
                                            <Form.Control as="select" value={heure} onChange={(event) => setHeure(event.target.value)} >
                                                <option value="" key={-1} style={{ color: "gray" }} disabled>
                                                    heure
                                                </option>
                                                {[...Array(24)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                                            </Form.Control>


                                    </MDBCol>



                                </MDBRow>
                    <MDBRow >
                                <MDBCol md='6' style={{marginTop:"6%"}}>

                                        {/*<MDBIcon fas icon="key me-3" size='lg'/>*/}
                                        {/* <Form.Label style={{marginRight:"5%"}}>Minute</Form.Label>*/}
                                        <Form.Control as="select" value={minute} onChange={(event) => setMinute(event.target.value)} >
                                            <option value="" key={-1} style={{ color: "gray" }} disabled>
                                                minute
                                            </option>
                                            {[...Array(60)].map((_, i) => <option key={i} value={i}>{i}</option>)}
                                        </Form.Control>

                                </MDBCol>

                                <MDBCol md='6' style={{marginTop:"6%"}}>

                                    {/*<MDBIcon fas icon="key me-3" size='lg'/>*/}
                                    {/*<Form.Label style={{marginRight:"5%"}}>Ville</Form.Label>*/}
                                    <Form.Control type="text" value={ville} onChange={(event) => setVille(event.target.value)}  placeholder="Ville de naissance">

                                    </Form.Control>
                                </MDBCol>
                    </MDBRow>

                            <MDBBtn className='mb-4' size='lg' type="submit" style={{marginTop:"10%", marginLeft:"30%"}}>Dévoiler votre Lune noire</MDBBtn>
                                </Form >

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src={launch} fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer >
            <Footer/>
        </main>

    );
    if (resultReady) return( <Result moonTitle={moonTitle} houseContent={houseContent} houseTitle={houseTitle} moonContent={moonContent} moonImg={moonImg} houseImg={houseImg} />);
}
 export default Calculator;