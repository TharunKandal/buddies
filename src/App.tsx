import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./Components/List/index";

function App() {
  const [models, setmodels] = useState<any>(["City", "Baleno"]);
  var companies = ["Honda", "Maruthi", "Renault"];

  var cars = [
    {
      company: "honda",
      cars: ["City", "Baleno"],
    },
    {
      company: "Maruthi",
      cars: ["800", "Swift"],
    },
    {
      company: "Renault",
      cars: ["Kwid", "Triber"],
    },
  ];
  var companies = cars.map((car) => {
    return car.company;
  });

  const handleCompanyChange = (company: any) => {
    var list = cars.filter((car) => {
      return car.company == company;
    });
    setmodels(list[0].cars);
  };
  const handleModelChange = (model: any) => {
    console.log(model);
  };
  useEffect(() => {
    // console.log(models.cars);
  }, [models]);

  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
