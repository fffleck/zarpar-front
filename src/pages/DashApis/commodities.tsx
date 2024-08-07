import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommoditiesList = () => {
  const [commoditiesHTML, setCommoditiesHTML] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommoditiesData = async () => {
      try {
        const response = await axios.get('https://br.investing.com/');
        const html = response.data;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const commodityRows = doc.querySelectorAll('table');

        let commoditiesHTMLString = '';
        commodityRows.forEach((row, index, listObjs) => {
            if (index<=0) {
                commoditiesHTMLString += row.outerHTML;
            }

            
            
        });

        var subclass = /class="([\s\S]+?)"/gi;
        var linkclass = /<a ([\s\S]+?)>/gi;
        var spanclass = /<span ([\s\S]+?)>/gi;
        var styleclass = /style="([\s\S]]*)">/gi;
        var svgclass = /<svg ([\s\S]+?)>/gi;
        var class2 = /class="datatable-v2_cell__([*]+?)"/gi


        setCommoditiesHTML(JSON.stringify(commoditiesHTMLString.replaceAll(subclass, ""))
                                                               .replaceAll(linkclass, "")
                                                               .replaceAll(styleclass, "")
                                                            //    .replaceAll(spanclass, "")
                                                               .replaceAll(svgclass, "")
                                                               .replaceAll(class2, "")
                                                               .replaceAll("<span class=\\\"\\\">","")
                                                               .replaceAll("<h4>","")
                                                               .replaceAll("</h4>","")
                                                               .replaceAll("<div>","")
                                                               .replaceAll("</div>","")
                                                               .replaceAll("<span>","")
                                                               .replaceAll("</span>","")
                                                               .replaceAll("</a>","")
                                                               .replace("<th>","<th scope='col'>")
                                                               .replace("<td>","<td widht='15%'>")
                                                               .replace("<table ","<table className='table table-bordered' widht=\"100%\"'")
                                                               
                                                               .replaceAll("\"",""));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados de commodities:', error);
        setLoading(false);
      }
    };
    console.log(commoditiesHTML);

    fetchCommoditiesData();
  }, [commoditiesHTML]);

  return (
    <><div className="card-img-top" style={{ "backgroundColor": "#9f9f9f", "padding": 10 }}>
          <h5 style={{ "color": "white", "textAlign": "center" }}> Commodities </h5>
      </div><div style={{ "padding": 40 }}>
              {loading ? (
                  <p>Carregando...</p>
              ) : (
                  <div dangerouslySetInnerHTML={{ __html: commoditiesHTML }} />
              )}
          </div></>
  );
};

export default CommoditiesList;
