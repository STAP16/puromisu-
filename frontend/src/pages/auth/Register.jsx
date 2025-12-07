import RegisterForm from "../../components/RegisterForm";
import styles from "./Login.module.css";

export default function Register() {
  return (
    <div className="page">
      <div className={styles.loginPageContainer}>
        <h1 className="title">Register page</h1>
        <div className={styles.LoginFormContainer}>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  );
}
