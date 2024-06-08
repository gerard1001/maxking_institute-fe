import React, { use } from "react";
import { useQRCode } from "next-qrcode";
import { format } from "date-fns";

const Certificate = React.forwardRef((props: any, ref: any) => {
  const { Canvas } = useQRCode();
  console.log(props.issuers, "***********************&&");
  return (
    <div ref={ref} className="certificate bg-[url('/cert-bg.png')]">
      <div className="w-full h-full bg-gradient-to-b from-slate-100 to-white flex flex-col items-center justify-center p-4">
        <div className="w-full h-full border border-yellow-300 flex flex-col items-center justify-center p-4 relative">
          <img
            src="/logo.png"
            alt=""
            width={120}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          />
          <img
            src="/cert.png"
            alt=""
            width={100}
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          />
          <h1
            style={{
              fontFamily: '"Lora", serif',
              fontSize: "3em",
              fontWeight: "bold",
              color: "#283361",
              margin: 0,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: "1",
            }}
          >
            Certificate
          </h1>
          <h2
            style={{
              fontFamily: '"Lora", serif',
              fontSize: "1.5em",
              fontWeight: "bold",
              color: "#283361",
              margin: 0,
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: "1",
            }}
          >
            of Completion
          </h2>
          <p
            className="header-1"
            style={{
              fontFamily: '"Lora", serif',
              color: "#a27f16",
              textTransform: "uppercase",
              fontWeight: 900,
              fontSize: "14px",
              margin: 0,
              lineHeight: "normal",
              marginTop: "20px",
            }}
          >
            This certificate is presented to:
          </p>
          <h2
            className="name"
            style={{
              fontFamily: '"Satisfy", cursive',
              fontSize: "2.5em",
              // fontWeight: "bold",
              color: "#283361",
              margin: 0,
              textAlign: "center",
              lineHeight: "1.5",
              marginTop: "10px",
              lineClamp: 1,
            }}
          >
            {props.name}
          </h2>
          <p
            className="header-2"
            style={{
              fontFamily: '"Lora", serif',
              color: "#111",
              fontSize: "16px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Has successfully completed the course:
          </p>
          <h3
            style={{
              fontFamily: '"Lora", serif',
              fontWeight: 900,
              color: "#111",
              textTransform: "capitalize",
              fontSize: "1.5em",
              margin: 0,
            }}
            className="line-clamp-1"
          >
            {props.course}
          </h3>
          <p
            className="date"
            style={{
              fontFamily: '"Lora", serif',
              color: "#4d7c9d",
              textTransform: "capitalize",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            On {format(new Date(props.date), "dd MMMM, yyyy")}
          </p>
          <div
            className=""
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
              alignItems: "end",
            }}
          >
            {props.issuers?.length === 2 && (
              <div className="w-[200px]">
                <div
                  style={{
                    borderBottom: "2px solid #000",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px auto",
                    fontFamily: '"Lora", serif',
                    color: "#bababa",
                  }}
                >
                  <img
                    src={props.issuers[1].signature}
                    alt=""
                    className="w-fit max-w-[120px] max-h-[50px] m-0"
                  />
                </div>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#111",
                    fontFamily: '"Lora", serif',
                    lineHeight: "14px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {props.issuers[1].name}
                </p>
                <p
                  style={{
                    color: "#283361",
                    fontFamily: '"Lora", serif',
                    margin: 0,
                  }}
                >
                  {props.issuers[1].position}
                </p>
              </div>
            )}{" "}
            <div>
              <Canvas
                text={`${props.link}`}
                options={{
                  errorCorrectionLevel: "M",
                  scale: 4,
                  width: 120,
                  color: {
                    dark: "#a55109",
                    light: "#fff",
                  },
                }}
              />
            </div>
            {props.issuers?.length >= 1 && (
              <div className="w-[200px]">
                <div
                  style={{
                    borderBottom: "2px solid #000",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "0px auto",
                    fontFamily: '"Lora", serif',
                    color: "#bababa",
                  }}
                >
                  <img
                    src={props.issuers[0].signature}
                    alt=""
                    className="w-fit max-w-[120px] max-h-[50px] m-0"
                  />
                </div>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#111",
                    fontFamily: '"Lora", serif',
                    lineHeight: "14px",
                    margin: 0,
                    marginTop: "10px",
                  }}
                >
                  {props.issuers[0].name}
                </p>
                <p
                  style={{
                    color: "#283361",
                    fontFamily: '"Lora", serif',
                    margin: 0,
                  }}
                >
                  {props.issuers[0].position}
                </p>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Certificate;
