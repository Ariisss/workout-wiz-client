import { Book, BookHalf } from "@/components/general/Book";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
    return (
        <Book>
            <BookHalf side="left" />
            <BookHalf side="right">
                <LoginForm />
            </BookHalf>
        </Book>
    )
}