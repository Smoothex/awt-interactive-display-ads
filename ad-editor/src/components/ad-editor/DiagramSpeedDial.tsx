import SpeedDial from '@mui/material/SpeedDial';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import SpeedDialAction from '@mui/material/SpeedDialAction';

import {
  ArticleOutlined,
  ImageOutlined,
  Slideshow
} from "@mui/icons-material";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {RootState} from "../../app/store";

import {ContainerType} from "../../ads/Container.interface";

import {createContainer} from "../../features/ad/adSlice";

export default function DiagramSpeedDial() {
  const {diagramStarter} = useSelector((store: RootState) => store.diagram);
  const dispatch = useDispatch();

  const handleCreateContainer = (type: ContainerType) => {
    if (diagramStarter) {
      dispatch(createContainer({parentAdKey: diagramStarter.key, containerType: type}));
    }
  }

  return (
      <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{position: 'absolute', bottom: 16, right: 16}}
          icon={<SpeedDialIcon/>}
      >
        <SpeedDialAction
            key="TextContainerNew"
            icon=<ArticleOutlined/>
            tooltipTitle="New text container"
            onClick={() => handleCreateContainer(ContainerType.Text)}
        />
        <SpeedDialAction
            key="ImageContainerNew"
            icon=<ImageOutlined/>
            tooltipTitle="New image container"
            onClick={() => handleCreateContainer(ContainerType.Image)}
        />
        <SpeedDialAction
            key="SlideshowContainerNew"
            icon=<Slideshow/>
            tooltipTitle="New slideshow container"
            onClick={() => handleCreateContainer(ContainerType.Slideshow)}
        />
      </SpeedDial>
  );
}