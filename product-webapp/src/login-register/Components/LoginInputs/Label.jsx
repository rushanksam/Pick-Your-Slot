/**
 * @author [mayank bahuguna]
 * @email [mayank.bahuguna2@globallogic.com]
 * @create date 2022-04-12 14:55:07
 * @modify date 2022-04-12 14:55:07
 * @desc [label button]
 */

import React from "react";
import "../../../App.css";

export default function Label(props) {
  return <label className="login-label">{props.name}</label>;
}
