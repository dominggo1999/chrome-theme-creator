import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoIosAdd } from 'react-icons/io';
import fontColorContrast from 'font-color-contrast';
import {
  PageWrapper, GoogleLogo, SearchBoxWrapper, SearchBox, NtpItemsWrapper, NtpItem,
} from './NewTabPage.style';
import { useSelectorImagesColor, useSelectorColorOnly } from '../../../hooks/useSelectorColor';

const NewTabPage = () => {
  const ntpColor = useSelectorColorOnly('ntp_text');
  const ntpBackground = useSelectorImagesColor('ntp_background');

  return (
    <PageWrapper
      style={{
        backgroundColor: ntpBackground,
      }}
    >
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
