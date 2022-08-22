import React from "react";
import { Tag, TagLabel } from "@chakra-ui/react";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="row mt-3">
        <div className="col-md-12 col-12 mx-auto p-2 nav d-flex justify-content-between">
          <div className="navbar">
            <Link href="/">
              <Tag
                size="lg"
                variant="subtle"
                className="mx-1 connectWallet"
                colorScheme="facebook"
              >
                <TagLabel>Decentralised Web Polling</TagLabel>
              </Tag>
            </Link>
          </div>
          <div className="buttons mt-2">
            <Link href='/elections'>
              <Tag
                size="lg"
                variant="subtle"
                className="connectWallet mx-1"
                colorScheme="twitter"
              >
                <TagLabel>
                <i class="fa-solid fa-square-poll-vertical mx-1"></i> Active Pollings
                </TagLabel>
              </Tag>
            </Link>
            <Link href="/organise">
              <Tag
                size="lg"
                variant="subtle"
                className="connectWallet mx-1 "
                colorScheme="twitter"
              >
                <TagLabel>
                  <i class="fa-solid fa-square-poll-vertical mx-1"></i> Organise
                  Polling
                </TagLabel>
              </Tag>
            </Link>

            <Tag
              size="lg"
              variant="subtle"
              className="connectWallet mx-1"
              colorScheme="twitter"
            >
              <TagLabel>
                <i class="fa-solid fa-plus mx-1"></i> Connect Wallet
              </TagLabel>
            </Tag>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
