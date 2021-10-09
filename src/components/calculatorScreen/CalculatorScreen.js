import React from "react";
import { useState, useEffect } from "react";
import "./CalculatorStyle.css";

const CalculatorScreen = () => {
  const [History, setHistory] = useState("");
  const [Output, setOutput] = useState(0);
  const [equalFlag, setEqualFlag] = useState(false);
  let changeHistory = (value) => {
    let history = History;
    let output = Output;
    if(equalFlag){
      setEqualFlag(false);
      history = output;
      output="";      
      setOutput("0");
    }
    if(value == "=" && output == "0" && history.match(/[=x/+-]$/)){      
      history = history.slice(0, -1);  
      output = "";
    }
    setHistory(history + output + value);
    setOutput("0");
    if (value == "=") {
      calculateResult(history + output + value);
      setEqualFlag(true);
    }
  };

  let changeOutput = (value) => {    
    let output = Output;
    if(equalFlag){
      output="0";
      setHistory("");
      setEqualFlag(false);
    }
    if(output =="0" && value=="."){
      setOutput(output+value);
    }else if (output == "0") {
      setOutput(value);
    } else {
      setOutput(output + value);
    }
  };

  let calc = (nums, ops) => {

    let newNums = [];
    let newOps = [];
    let flag = false;
    console.log(
      "nums:" + nums.length.toString() + " ops:" + ops.length.toString()
    );
    console.log(nums);
    console.log(ops); 
    if (nums.length == 1 && ops.length == 0) {
      return nums[0];
    }
    if(!ops.includes("x") && !ops.includes("/")){
      let temp = 0;
      if(ops[0] == '+'){
        temp = parseFloat(nums[0])+parseFloat(nums[1]);        
      }else{
        temp = parseFloat(nums[0])-parseFloat(nums[1]);
      }
      nums.shift();
      nums.shift();   
      nums.unshift(temp.toString());
      ops.shift();  
      return calc (nums,ops);    
    }
   
 
    ops.map((val, ind) => {
      if (flag) {
      } else if (val == "x") {
        flag = true;
        newNums.push(
          (parseFloat(nums[ind]) * parseFloat(nums[ind + 1])).toString()
        );
        ops.map((v, i) => {
          if (i > ind) newOps.push(ops[i]);
        });
        nums.map((v, i) => {
          if (i > ind + 1) {
            newNums.push(nums[i]);
          }
        });
      } else if (val == "/") {
        flag = true;
        newNums.push(
          (parseFloat(nums[ind]) / parseFloat(nums[ind + 1])).toString()
        );
        ops.map((v, i) => {
          if (i > ind) newOps.push(ops[i]);
        });
        nums.map((v, i) => {
          if (i > ind + 1) {
            newNums.push(nums[i]);
          }
        });
      } else {
        newNums.push(nums[ind]);
        newOps.push(val);
      }
    });
    return calc(newNums, newOps);
  };

  let calculateResult = (val) => {
    let numbers = val.split(/[=x/+-]/).filter((x) => x != "");
    let operators = val.split(/[0-9]/g).filter((x) => x != "" && x != "=" && x!= ".");
    setOutput(calc(numbers, operators));
  };

  return (
    <div>
      <div className="big-container">
      <p>
          React Calculator App          
        </p>
        <div className="container">        
          <div className="top">
            <input readOnly className="history" value={History} />
            <input readOnly className="output" value={Output} />
          </div>
          <div className="grid-container">
            <button
              id="ac"
              onClick={() => {
                setHistory("");
                setOutput("0");
              }}
            >
              AC
            </button>
            <button
              id="divide"
              onClick={() => {
                changeHistory("/");
              }}
            >
              /
            </button>
            <button
              id="multiply"
              onClick={() => {
                changeHistory("x");
              }}
            >
              x
            </button>
            <button
              id="seven"
              onClick={() => {
                changeOutput("7");
              }}
            >
              7
            </button>
            <button
              id="eight"
              onClick={() => {
                changeOutput("8");
              }}
            >
              8
            </button>
            <button
              id="nine"
              onClick={() => {
                changeOutput("9");
              }}
            >
              9
            </button>
            <button
              id="substract"
              onClick={() => {
                changeHistory("-");
              }}
            >
              -
            </button>
            <button
              id="four"
              onClick={() => {
                changeOutput("4");
              }}
            >
              4
            </button>
            <button
              id="five"
              onClick={() => {
                changeOutput("5");
              }}
            >
              5
            </button>
            <button
              id="six"
              onClick={() => {
                changeOutput("6");
              }}
            >
              6
            </button>
            <button
              id="sum"
              onClick={() => {
                changeHistory("+");
              }}
            >
              +
            </button>
            <button
              id="one"
              onClick={() => {
                changeOutput("1");
              }}
            >
              1
            </button>
            <button
              id="two"
              onClick={() => {
                changeOutput("2");
              }}
            >
              2
            </button>
            <button
              id="three"
              onClick={() => {
                changeOutput("3");
              }}
            >
              3
            </button>
            <button
              id="equal"
              onClick={() => {
                changeHistory("=");
              }}
            >
              =
            </button>
            <button
              id="zero"
              onClick={() => {
                changeOutput("0");
              }}
            >
              0
            </button>
            <button
              id="dot"
              onClick={() => {
                changeOutput(".");
              }}
            >
              .
            </button>
          </div>
        </div>       
      </div>
      <p>Coded by <strong>Cuma Umur Dogan</strong></p>
    </div>
  );
};
export default CalculatorScreen;
