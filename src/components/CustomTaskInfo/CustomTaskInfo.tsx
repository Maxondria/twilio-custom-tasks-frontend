//@ts-nocheck
import { ITask } from "@twilio/flex-ui";
import React from "react";

type Props = {
  task?: ITask;
};

const styles = {
  itemWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "5px",
  },
  itemWrapperContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemBold: { fontWeight: "bold" },
  item: {
    fontWeight: "bold",
    color: "#1975D2",
  },

  textCenter: {
    textAlign: "center",
    color: "blue",
  },
  info: { position: "relative", top: "3px" },
};

const CustomTaskInfo: React.FC<Props> = ({ task }) => {
  const {
    email,
    applicationId,
    carrierName,
    planName,
    premium,
    effectiveDate,
  } = task?.attributes || {};

  return (
    <span className="Twilio">
      <h1>Submit an on Exchange Application</h1>
      <p>
        A contact has submitted an on-exchange application, we need to complete
        it and submit it for them.
      </p>
      <h1 style={styles.itemBold}>APPLICATION DETAILS</h1>
      <ul>
        <li>
          <div style={styles.itemWrapper}>
            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Email: </span>
              <span>{email}</span>
            </div>

            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Application ID: </span>
              <span>{applicationId}</span>
            </div>

            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Carrier Name: </span>
              <span>{carrierName}</span>
            </div>

            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Plan Name: </span>
              <span>{planName}</span>
            </div>

            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Premium: </span>
              <span>${premium}</span>
            </div>

            <div style={styles.itemWrapperContent}>
              <span style={styles.item}>Effective Date: </span>
              <span>{effectiveDate}</span>
            </div>
          </div>
        </li>
        <li>&nbsp;</li>
      </ul>
      <p>&nbsp;</p>
    </span>
  );
};

export default CustomTaskInfo;
