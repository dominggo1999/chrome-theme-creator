import React, {
  useLayoutEffect, useRef, useState,
} from 'react';
import { SidebarWrapper, Navigation, Copyright } from './DocumentationSidebar.style';
import { getAnchor } from '../../util/getAnchor';
import useOnClickOutside from '../../hooks/useClickOutside';

const Link = ({
  children, href, active, index,
}) => {
  return (
    <a
      href={href}
      className={active === index ? 'link-active' : null}
    >{children}
    </a>
  );
};

const getActiveElement = (rects) => {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y },
  );

  return closest.index;
};

const DocumentationSidebar = ({ sidebarOpen, closeSidebar }) => {
  const navigationRef = useRef();
  const [active, setActive] = useState(0);
  const [titles, setTitles] = useState([]);
  const sidebarRef = useRef();

  // Get all h1 in documentation
  useLayoutEffect(() => {
    const headingOneList = document.querySelectorAll('#documentation-content h1');
    const titles = Array.from(headingOneList).map((i) => i.textContent.replace('#', ''));
    setTitles(titles);
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
    // Get all navigation links
      const links = navigationRef.current.querySelectorAll('a');
      const slugs = Array.from(links).map((item) => getAnchor(item.innerText));
      const sections = slugs.map((item) => document.getElementById(item)).filter((i) => i);
      if(!sections.length) return;

      const activeLink = getActiveElement(sections.map((d) => d.getBoundingClientRect()));
      setActive(activeLink);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useOnClickOutside(sidebarRef, closeSidebar, sidebarOpen, false);

  return (
    <SidebarWrapper
      ref={sidebarRef}
      open={sidebarOpen}
    >
      <Navigation ref={navigationRef}>
        <ul>
          {titles?.length > 0 && titles.map((i, index) => {
            return (
              <li key={i}>
                <Link
                  active={active}
                  href={`#${getAnchor(i)}`}
                  index={index}
                >
                  {i}
                </Link>
              </li>
            );
          })}
        </ul>

      </Navigation>
    </SidebarWrapper>
  );
};

export default DocumentationSidebar;
