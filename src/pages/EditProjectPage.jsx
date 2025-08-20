import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [isFetching, setIsFetching]=useState(true)

  const params=useParams()


  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)

    .then(()=>{
      console.log(response)
      setTitle(response.data.title)
      setDescription(response.data.description)
      //setIsFetching(false)
    })
    .catch((error)=>{
      console.log(error)
    })

  },[])

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    // ...updated logic should be here

    const updatedProject = {
      title,
      description
    }

    try {
      const response= await axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`, updatedProject);
      navigate(`/projects/${params.projectId}`)

    } catch (error) {
      console.log(error)
    }

  };

  const deleteProject = () => {
    // ...delete logic should be here

    axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${params.projectId}`)
    .then(()=>{
      navigate("/projects")

    })
    .catch(()=>{
      console.log(error)
    })
    
  }; 

// if (isFetching){
// return (
//   <h3>Loading...</h3>
// )}

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>      
    </div>
  );
}

export default EditProjectPage;
