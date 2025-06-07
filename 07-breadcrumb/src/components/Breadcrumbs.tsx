import { Link, useLocation } from "react-router-dom";
import { MdOutlineChevronRight } from "react-icons/md";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const path = location.pathname.substring(1).split("/");

  let breadcrumbPath = "";

  return (
    <div id="breadcrumb-container">
      <Link to={"/"}>Home</Link>
      <MdOutlineChevronRight className="beadcrumb-separator" size={16} />

      {path.map((pathElement, index) => {
        breadcrumbPath += `/${pathElement}`;

        return (
          <div key={`bredcrumb-element-${pathElement}`} style={{ display: "flex", alignItems: "center" }}>
            <Link to={breadcrumbPath} style={{ textTransform: "capitalize" }}>
              {pathElement}
            </Link>
            {index !== path.length - 1 && <MdOutlineChevronRight className="beadcrumb-separator" size={16} />}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
