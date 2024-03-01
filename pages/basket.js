import React, { useContext, useEffect } from "react";
import Header from "components/Documentation/Header";
import UserContext from "../config/context";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import AppNavbar from "pagesComponents/AppNavbar";
import btcIcon from "../svgs/btc.svg";
import ethIcon from "../svgs/eth.svg";
import usdtIcon from "../svgs/usdt.svg";
import usdcIcon from "../svgs/usdc.svg";
import nearIcon from "../svgs/near.svg";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Basket = () => {
  const router = useRouter();
  const { walletSelector, accountId, nftMetadata } = useContext(UserContext);

  useEffect(() => {
    AOS.init({
      duration: 300,
    });
  }, []);

  const RADIAN = Math.PI / 180;
  const data = [
    { name: "A", value: 80, color: "#ff0000" },
    { name: "B", value: 45, color: "#00ff00" },
    { name: "C", value: 25, color: "#0000ff" },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 100;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };

  const data01 = [
    { name: "BTC", value: 20 },
    { name: "ETH", value: 20 },
    { name: "USDT", value: 10 },
    { name: "USDC", value: 10 },
    { name: "NEAR", value: 40 },
  ];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        style={{ fontSize: "12px" }}
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
      >
        {`${data01[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Header title="Defishard | Basket" />
      <AppNavbar title={router.asPath} />

      <section
        className="flex header items-start bg-fill min-h-screen overflow-y-auto py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 10 ,14) 0%, rgba(20,20,32,1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-row gap-x-2 mx-auto w-4/5">
          <div data-aos="zoom-in" className="container w-full">
            <div className="w-full px-0 md:px-4 mt-20 md:mt-0 text-center">
              <div className="grid grid-cols-1 justify-start items-start">
                <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                  Token Basket
                </p>
              </div>
              <div className="w-full border-b-2 border-eversnipe mb-2"></div>
              <div className="grid grid-flow-row gap-8 text-neutral-600 grid-cols-1 md:grid-cols-3 mt-12">
                <div className="block">
                  <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                    Choose your asset and risk
                  </p>
                  <div className="flex flex-col gap-3 my-8">
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <img src={btcIcon} width={20} height={20} />
                      <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                        BTC
                      </p>
                      <input
                        disabled
                        name="btc"
                        type={"number"}
                        width={10}
                        className="w-32 bg-eversnipe-input border-2 border-eversnipe text-white rounded-md p-1"
                      />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <img src={ethIcon} width={20} height={20} />
                      <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                        ETH
                      </p>
                      <input
                        disabled
                        name="btc"
                        type={"number"}
                        width={10}
                        className="w-32 bg-eversnipe-input border-2 border-eversnipe text-white rounded-md p-1"
                      />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <img src={usdtIcon} width={20} height={20} />
                      <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                        USDT
                      </p>
                      <input
                        disabled
                        name="btc"
                        type={"number"}
                        width={10}
                        className="w-32 bg-eversnipe-input border-2 border-eversnipe text-white rounded-md p-1"
                      />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <img src={usdcIcon} width={20} height={20} />
                      <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                        USDC
                      </p>
                      <input
                        disabled
                        name="btc"
                        type={"number"}
                        width={10}
                        className="w-32 bg-eversnipe-input border-2 border-eversnipe text-white rounded-md p-1"
                      />
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-between">
                      <img src={nearIcon} width={20} height={20} />
                      <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                        NEAR
                      </p>
                      <input
                        disabled
                        name="btc"
                        type={"number"}
                        width={10}
                        className="w-32 bg-eversnipe-input border-2 border-eversnipe text-white rounded-md p-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center my-2 md:mt-10">
                  <div className="flex flex-col gap-2">
                    <PieChart width={300} height={220}>
                      <Pie
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        stroke="none"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      {needle(value, data, cx, cy, iR, oR, "#d0d000")}
                    </PieChart>
                  </div>
                  <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                    Risk Meter
                  </p>
                </div>
                <div className="flex flex-col items-center justify-around gap-3">
                  <p className="font-bold text-md text-[#CCA8B4] hover:text-opacity-80">
                    Visualizer
                  </p>
                  <div className="flex flex-col gap-2">
                    <ResponsiveContainer width={400} height={300}>
                      <PieChart width={400} height={300}>
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={data01}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          fill="#8884d8"
                          label={renderCustomizedLabel}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="w-full grid grid-flow-col grid-cols-1 mt-20 items-center justify-center">
                <button
                  className="w-1/2 bg-eversnipe hover:bg-eversnipe-hover transition-colors duration-100 py-2 px-4 text-eversnipe-dark font-extrabold text-md rounded-lg mx-auto"
                  disabled
                >
                  <p>Mint Now</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Basket;
