import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask"; // for rendering Task Add Form
import TaskCard from "../components/TaskCard"; // for rendering Task List
import { useEffect, useState } from "react";
import axios from "axios";

function ProjectDetailsPage() {


  const[project, setPorject]=useState(null)




  const params = useParams();

  useEffect(() => {

    getData();

  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}?_embed=tasks`);
      console.log(response)
      setPorject(response.data)

    } catch (error) {
      console.log(error);
    }
  };

  if(project===null){
    return(
      <h3>Loading...</h3>
    )
  }

  return (
    <div className="ProjectDetailsPage">
      <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </div>

      {project.tasks.map((eachTask)=>{

        return <TaskCard key={eachTask.id}{...eachTask}/>
      })}

      {/* example of a single TaskCard being rendered */}
      {/* <TaskCard /> */}

      {/* ... form for adding a new Task should be rendered here    */}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/PROJECT_ID_HERE`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;
