import { Grid2 } from "@mui/material";
import { ContactForm } from "@/components/help/ContactForm";

export default function Contact() {
  return (
    <Grid2
      container
      spacing={4}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <ContactForm />
      </Grid2>
    </Grid2>
  );
}
