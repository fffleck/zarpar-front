import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



const ShippingCommodities: React.FC = () => {
    return (
        <div className="card border-light col-xl-5 col-lg-12 col-md-12" style={{ "padding": 0 }}>
            <div className="card-img-top" style={{ "backgroundColor": "#9f9f9f", "padding": 10 }}>
                <h5 style={{ "color": "white", "textAlign": "center" }}> Comodites</h5></div>
            <div className="table">
                <Carousel>
                    <div className="carousel-slide">
                        <img src="/imagens/grafic.svg" alt="" />
                    </div>
                    <div className="carousel-slide">
                        <img src="/imagens/grafic2.svg" alt=""/>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default ShippingCommodities;
