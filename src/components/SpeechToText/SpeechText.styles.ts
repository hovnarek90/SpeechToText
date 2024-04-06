import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  containerPopUP: ({ popUpIsOpen }: { popUpIsOpen: boolean }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: `${popUpIsOpen ? "flex" : "none"}`,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  }),
  content: {
    backgroundColor: "#FFFFFF",
    width: "800px",
    height: "630px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "20px",
    position: "relative",
  },
  title: {},
  contentText: {
    textAlign: "center",
  },
  contentName: {},
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "10px",
    fontSize: "20px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  buttonSpeech: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "1px solid black",
    "& img": {
      width: "70%",
    },
  },
  transcript: {},
});
