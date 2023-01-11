import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {AdType} from "../../ads/Ad.interface";
import StandardBannerNode from "./StandardBannerNode";
import LBannerNode from "./LBannerNode";

const Diagram = () => {
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);

  return (
      <div style={{width: "1280px", height: "720px", backgroundColor: "#ecf0f1"}}>
        {diagramStarter && diagramStarter.type === AdType.StandardBanner &&
            <StandardBannerNode key={diagramStarter.key} ad={diagramStarter}/>
        }
        {diagramStarter && diagramStarter.type === AdType.LBanner &&
            <LBannerNode key={diagramStarter.key} ad={diagramStarter}/>
        }
      </div>
  );
}

export default Diagram;