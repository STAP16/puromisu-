import LoginForm from "../../components/LoginForm";
import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className="page">
      <div className={styles.loginPageContainer}>
        <h1 className="title">Login page</h1>
        <div className={styles.LoginFormContainer}>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
}
