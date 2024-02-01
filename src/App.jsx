import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ngarezeqsxwghskqnzda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXJlemVxc3h3Z2hza3FuemRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY2OTk0MjMsImV4cCI6MjAyMjI3NTQyM30.Ji04SA6HaWDv6ZNLY7hO0-B-51MnL03nf5aEcBaprSQ"
);

function App() {
  const [countries, setcountries] = useState([]);
  const [hasSubmit, sethasSubmit] = useState(false);

  const [country, setcountry] = useState({
    name: '',
  });

  useEffect(() => {
    getcountries();
  }, []);
  

  async function getcountries() {
    const { data } = await supabase.from("countries").select("*");
    setcountries(data);
  }

  async function createUser() {
    try {
      if(hasSubmit){
        console.log("nameC" , country);
      const { data, error } = await supabase
        .from("countries")
        .insert({ name: country.name });
      sethasSubmit(!hasSubmit);
      return data;
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function handlecountryName(event) {
    event.preventDefault();
    sethasSubmit(!hasSubmit);
    setcountry(({
      name: event.target.value,
    }));

  }


  
  async function deleteUser(userId) {
    await supabase.from("countries").delete().eq('id' , userId);
    getcountries();

  }
  return (
    <>
      <form onSubmit={createUser()}>
        <input type="text" placeholder="Country name" name="name" onChange={handlecountryName}/>
        <button type="submit" disabled={country.name.length == 0 ? true : false}>
          createUser
        </button>
      </form>
      <div>
        <ul>
          {countries?.map((country) => (
            <>
              <div className="country">
                <li key={country.id}>{country?.name}</li>
                <button type="submit" onClick={() => {deleteUser(country.id)}}>
                  delete
                </button>
              </div>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
