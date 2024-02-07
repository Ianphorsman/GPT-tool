import SideNavigationMobile from "./SideNavigationMobile";
import SideNavigationDesktop from "./SideNavigationDesktop";

const SideNavigation = ({ isMobile, ...props }) => {
  return isMobile ? <SideNavigationMobile {...props} /> : <SideNavigationDesktop {...props} />
}

export default SideNavigation
