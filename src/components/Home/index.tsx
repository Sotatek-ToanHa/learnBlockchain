import React, { useEffect, useState } from "react";
import { Form, Input, Button, message as msg } from "antd";
import "./style.css";
import { ethers } from "ethers";

declare let window: any;

type FormType = {
  receiver: string;
  amount: string;
};

const Home: React.FC = () => {
  const initialValues: FormType = {
    receiver: "0xaDCAf01fB71781D245951D245a45E09a26440d46",
    amount: "0.00001",
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    address: "",
    Balance: null,
  });
  const getBalance = async (address: string) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    setData({
      Balance: ethers.utils.formatEther(balance),
    });
  };

  const accountChangeHandler = (account: string) => {
    setData({
      address: account,
    });

    getBalance(account);
  };
  
  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (!!accounts) {
          accountChangeHandler(accounts[0]);
        }
      } else {
        msg.error("install metamask extension");
      }
    } catch (e) {
      msg.error(e as string);
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);

  const send = async (data: FormType) => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const tx = await signer.sendTransaction({
        to: data.receiver,
        value: ethers.utils.parseEther(data.amount),
      });
      await tx.wait(1);
      setIsLoading(false);
    } catch (e: any) {
      console.log({e})
      setIsLoading(false);
      if(e.code === 4001) {
        return msg.error("User denied transaction signature");
      }
      msg.error(e?.reason);
    }
  };

  return (
    <div className="container">
      <p>Create transaction</p>
      <Form layout="vertical" initialValues={initialValues} onFinish={send}>
        <Form.Item name="receiver" label="Receiver address">
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
