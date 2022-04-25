import React, { useLayoutEffect, useRef, useState } from 'react';
import { SidebarWrapper, Navigation } from './DocumentationSidebar.style';
import { getAnchor } from '../../util/getAnchor';

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

const DocumentationSidebar = () => {
  const navigationRef = useRef();
  const [active, setActive] = useState(0);

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

  return (
    <SidebarWrapper>
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
        </ul>
      </Navigation>
    </SidebarWrapper>
  );
};

export default DocumentationSidebar;
