import { Link } from "react-router-dom";

function ProjectCard ({title, description, id}) {
  
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${id}`}>
        {/* <h3>{props.eachProject.title}</h3> This is a traditional, longer way to do it*/}
        <h3>{title}</h3>
      </Link>
      <p>PROJECT_DESCRIPTION_HERE</p>
    </div>
  );
}

export default ProjectCard;