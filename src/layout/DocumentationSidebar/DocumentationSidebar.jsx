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
  const sidebarRef = useRef();

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
          <li>
            <Link
              active={active}
              href={`#${getAnchor('Lorem ipsum dolor sit amet consectetur')}`}
              index={0}
            >
              Lorem ipsum dolor sit amet consectetur
            </Link>
          </li>
          <li>
            <Link
              active={active}
              href={`#${getAnchor('Dure repudiandae perspiciatis reprehenderit')}`}
              index={1}
            >
              Dure repudiandae perspiciatis reprehenderit
            </Link>
          </li>
          <li>
            <Link
              active={active}
              href={`#${getAnchor('Quisquam nemo reprehenderit')}`}
              index={2}
            >
              Quisquam nemo reprehenderit
            </Link>
          </li>
          <li>
            <Link
              active={active}
              href={`#${getAnchor('Voluptate tempora')}`}
              index={3}
            >
              Voluptate tempora
            </Link>
          </li>
          <Copyright>Developed by {' '}
            <a
              target="_blank"
              href="https://github.com/dominggo1999"
              rel="noopener noreferrer"
            >
              dominggo1999
            </a>
          </Copyright>
        </ul>
      </Navigation>
    </SidebarWrapper>
  );
};

export default DocumentationSidebar;
