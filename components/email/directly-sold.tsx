import React from 'react';
import { Html } from '@react-email/html';
import { Head, Hr, Link, Row, Section, Tailwind, Text } from '@react-email/components';

interface ProductDirectlySoldEmailProps {
  productName: string;
  address: string;
}

const ProductDirectlySoldEmail = ({ productName, address }: ProductDirectlySoldEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Section className="text-center">
          <Row>
            <Head>
              <title>Your Bit {productName ?? ""} has been bought</title>
            </Head>
            <Text className="text-2xl font-bold text-neutral-900">
              Your Bit {productName ?? ""} has been bought
            </Text>
            <Text className="text-lg text-neutral-900">
              Please send your Bit here: {address} in the next 7 Days
            </Text>
            <Hr className="mb-10" />
            <Link
              className="rounded-lg bg-neutral-900 px-6 py-2 text-white"
              href="https://bitztech.de/en/transactions"
            >
              Transactions
            </Link>
          </Row>
        </Section>
      </Html>
    </Tailwind>
  );
}

export default ProductDirectlySoldEmail;
