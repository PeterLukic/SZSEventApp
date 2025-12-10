import * as SQLite from "expo-sqlite";

let db = null;

export async function initDB() {
  try {
    console.log("=== DATABASE INITIALIZATION ===");
    
    // Open the database
    db = SQLite.openDatabaseSync("events.db");
    console.log("Database opened successfully");
    
    // Create the events table if it doesn't exist
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS events (
          eventid INTEGER PRIMARY KEY,
          eventdate TEXT NOT NULL,
          title TEXT NOT NULL,
          townname TEXT NOT NULL,
          countryname TEXT NOT NULL,
          imagepath TEXT
        );
      `);
      console.log("Events table created or already exists");
      
      // Seed sample data only if the table is empty. Do NOT delete existing rows.
      const existingRows = await db.getAllAsync("SELECT * FROM events");
      if (!existingRows || existingRows.length === 0) {
        console.log("No events found in DB — inserting sample data...");
        await db.execAsync(`
          INSERT INTO events (eventid, eventdate, title, townname, countryname, imagepath) 
          VALUES 
          (1, '03-12-2025', 'Квиз из блока, Bar 28', 'Граз', 'Аустриа', 'assets/images/events/EventGraz.jpg');
        `);
        console.log("Sample data inserted");
      } else {
        console.log(`Events table already has ${existingRows.length} row(s); skipping seed.`);
      }
      
      // Query and log the data
      const result = await db.getAllAsync("SELECT * FROM events");
      console.log("=== QUERY RESULT ===");
      console.log("Events found:", result);
      console.log("Number of events:", result?.length || 0);
      
      if (result && result.length > 0) {
        console.log("First event:", result[0]);
      }
      
      return result;
    } catch (tableError) {
      console.error("Error with events table:", tableError);
      throw tableError;
    }
  } catch (error) {
    console.error("=== ERROR IN INITDB ===");
    console.error("Error in initDB:", error);
    console.error("Error message:", error.message);
    throw error;
  }
}

export async function getEventsWithDetails() {
  try {
    if (!db) {
      console.log("Database not initialized, initializing now...");
      await initDB();
    }
    
    console.log("=== GET EVENTS WITH DETAILS ===");
    const result = await db.getAllAsync("SELECT * FROM events");
    
    console.log("Query result:", result);
    console.log("Result length:", result?.length);
    
    if (!result || result.length === 0) {
      console.log("No events found in database");
      return [];
    }
    
    return result;
  } catch (error) {
    console.error("Error in getEventsWithDetails:", error);
    return [];
  }
}