import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Switch from "@radix-ui/react-switch";
import styles from "./editpanel.module.css";
import { Trash2 } from "lucide-react";

const EditPanel = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles.Content}>
        <Dialog.Title className={styles.Title}>
          Edit Project: Coding
        </Dialog.Title>
        <Form.Root>
          <Form.Field className={styles.Field} name="currentKeywords">
            <Form.Label className={styles.Label}>Current Keywords</Form.Label>
            <div className={styles.KeywordsContainer}>
              {Array.from({ length: 3 }).map((_, index) => (
                <button
                  key={index}
                  className={styles.Keywords}
                  onClick={(e) => e.preventDefault()}
                >
                  coding
                  <Trash2 />
                </button>
              ))}
            </div>
          </Form.Field>

          <Form.Field className={styles.Field} name="newKeywords">
            <Form.Label className={styles.Label}>New Keywords</Form.Label>
            <Form.Control asChild>
              <textarea rows={4} className={styles.Input} />
            </Form.Control>
            <Form.Message className={styles.Message}>
              Seperate by comma ( , )
            </Form.Message>
          </Form.Field>

          <Form.Field className={styles.Field} name="activity">
            <Form.Label className={styles.Label}>
              Set activity status
            </Form.Label>
            <Form.Control asChild>
              <Switch.Root className={styles.SwitchRoot} id="airplane-mode">
                <Switch.Thumb className={styles.Thumb} />
              </Switch.Root>
            </Form.Control>
          </Form.Field>

          <Form.Submit />
        </Form.Root>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Dialog.Close asChild>
            <button className={`${styles.Button} violet`}>Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close"></button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default EditPanel;
