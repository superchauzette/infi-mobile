import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import logo from "../assets/images/cofidoc-black.png";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { ErrorField } from "../ui/ErrorField";

export function Login() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <img src={logo} alt="Logo" width="80%" />
      </Box>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { email, password } = values;
            setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password);
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
              <Field
                type="email"
                name="email"
                as={TextField}
                variant="filled"
              />
              <ErrorMessage name="email" component={ErrorField} />

              <Field
                type="password"
                name="password"
                as={TextField}
                variant="filled"
              />
              <ErrorMessage name="password" component={ErrorField} />
              <Button type="submit" variant="text" disabled={isSubmitting}>
                Connexion
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box p={2}>
        <Link to="/reset-password">
          <Typography>Mot de passe oubli?? (email requis)</Typography>
        </Link>
        <Box py={1} />
        <Link to="/sign-in">
          <Typography>Inscription</Typography>
        </Link>
      </Box>
    </Box>
  );
}
