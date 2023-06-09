// TradingViewWidget.jsx
import Link from "next/link";

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_4ccd6") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: "BITSTAMP:BTCUSD",
          interval: "30",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_4ccd6",
        });
      }
    }
  }, []);

  return (
    <div style={{position:"relative", width:"100%", overflow:"hidden"}}>
      <div className="tradingview-widget-container">
        <div id="tradingview_4ccd6" />
          <Link
            href="https://www.tradingview.com/symbols/BTCUSD/?exchange=BITSTAMP"
            rel="noopener"
            target="_blank">
            <span className="blue-text">Bitcoin chart</span>
          </Link>{" "}
         
      </div>
    </div>
  );
}
