import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoIosAdd } from 'react-icons/io';
import {
  PageWrapper, GoogleLogo, SearchBoxWrapper, SearchBox, NtpItemsWrapper, NtpItem,
} from './NewTabPage.style';

const NewTabPage = () => {
  return (
    <PageWrapper>
      <SearchBoxWrapper>
        <GoogleLogo />
        <SearchBox>
          <div></div>
          <p>Search Google or type URL</p>
          <div></div>
        </SearchBox>
        <NtpItemsWrapper>
          <NtpItem>
            <span>
              <FcGoogle />
            </span>
            <p>Google</p>
          </NtpItem>
          <NtpItem>
            <span>
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
