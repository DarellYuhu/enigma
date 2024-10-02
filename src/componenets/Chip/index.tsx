import styles from "./chip.module.css";
const Chip = ({ text }: { text: string }) => {
  return <div className={styles.chip}>{text}</div>;
};

export default Chip;
