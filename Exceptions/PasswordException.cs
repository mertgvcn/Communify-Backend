namespace LethalCompany_Backend.Exceptions
{
    public class PasswordException : Exception
    {
        public PasswordException(string message) : base(message)
        {

        }
    }

    public class SamePasswordException : Exception
    {
        public SamePasswordException(string message) : base(message)
        {

        }
    }

    public class InvalidPasswordException : Exception
    {
        public InvalidPasswordException(string message) : base(message)
        {

        }
    }
}
