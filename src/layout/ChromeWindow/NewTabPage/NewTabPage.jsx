import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoIosAdd } from 'react-icons/io';
import fontColorContrast from 'font-color-contrast';
import {
  PageWrapper,
  GoogleLogo,
  SearchBoxWrapper,
  SearchBox,
  NtpItemsWrapper,
  NtpItem,
  BackgroundImage,
} from './NewTabPage.style';
import useNtpSettingsStore from '../../../store/useNtpSettingsStore';
import { useSelectorImagesColor, useSelectorColorOnly, useSelectorImageValue } from '../../../hooks/useSelectorColor';

const settingsSelector = (key) => {
  return useNtpSettingsStore((state) => state[key]);
};

const NewTabPage = () => {
  const ntpColor = useSelectorColorOnly('ntp_text');
  const ntpBackground = useSelectorImagesColor('ntp_background');
  const ntpBackgroundImage = useSelectorImageValue('ntp_background');
  const horizontalAlignment = settingsSelector('horizontalAlignment');
  const verticalAlignment = settingsSelector('verticalAlignment');
  const repeatMode = settingsSelector('repeatMode');
  const size = settingsSelector('backgroundSize');

  const backgroundPosition = `${horizontalAlignment} ${verticalAlignment}`.trim();
  const backgroundSize = size === 'fill-screen' ? 'cover' : 'auto';

  return (
    <PageWrapper
      style={{ backgroundColor: ntpBackground }}
      id="ntp_page"
    >
      {
          ntpBackgroundImage && (
          <BackgroundImage
            style={{
              backgroundImage: `url('${ntpBackgroundImage}')`,
              backgroundRepeat: repeatMode,
              backgroundPosition,
              backgroundSize,
            }}
          />
          )
      }
      <SearchBoxWrapper>
        <GoogleLogo />
        <SearchBox>
          <div></div>
          <p>Search Google or type URL</p>
          <div></div>
        </SearchBox>
        <NtpItemsWrapper
          style={{
            color: ntpColor,
          }}
        >
          <NtpItem>
            <span>
              <FcGoogle />
            </span>
            <p>Google</p>
          </NtpItem>
          <NtpItem>
            <span
              style={{
                color: fontColorContrast(ntpBackground),
              }}
            >
              <IoIosAdd />
            </span>
            <p>Add Shortcut</p>
          </NtpItem>
        </NtpItemsWrapper>
      </SearchBoxWrapper>
    </PageWrapper>
  );
};

export default NewTabPage;
