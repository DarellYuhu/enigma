import styles from "./card.module.css";

const Card = ({
  children,
  id,
  title,
  additionalButton,
}: {
  children: React.ReactNode;
  id?: string;
  title?: string;
  additionalButton?: React.ReactNode;
}) => {
  return (
    <div id={id} className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        {additionalButton}
      </div>
      {children}
    </div>
  );
};

export default Card;
