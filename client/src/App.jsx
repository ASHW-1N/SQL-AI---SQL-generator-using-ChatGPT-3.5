import styles from "./index.module.css";
import sqlServer from "./assets/sql-server.png";
import { useState } from "react";

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    try {
      const response = await fetch("http://localhost:3002/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryDescription: userPrompt }),
      });
  
      // Check if the response is ok
      if (!response.ok) {
        console.error('Server responded with status', response.status);
        return '';
      }
  
      const data = await response.json();
      return data.sqlQuery.trim();
    } catch (error) {
      console.error('Error fetching from server:', error);
      return '';
    }
  };
  

  return (
    <main className={styles.main}>
      <img src={sqlServer} className={styles.icon} alt="SQL server" />
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Describe your query"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <input type="submit" value="Generate query" />
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  );
}