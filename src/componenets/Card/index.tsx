import styles from "./card.module.css";

const Card = ({
  children,
  id,
  title,
  additionalButton,
  padding = true,
}: {
  children: React.ReactNode;
  id?: string;
  title?: string;
  additionalButton?: React.ReactNode;
  padding?: boolean;
}) => {
  return (
    <div
      id={id}
      className={styles.container}
      style={{ padding: padding ? "15px" : "0" }}
    >
      <div className={styles.header} style={{ margin: padding ? "" : "15px" }}>
        <h4 className={styles.title}>{title}</h4>
        {additionalButton}
      </div>
      {children}
    </div>
  );
};

export default Card;
