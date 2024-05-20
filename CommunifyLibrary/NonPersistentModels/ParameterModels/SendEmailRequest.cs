using CommunifyLibrary.Enums;

public class SendEmailRequest
{
    public string ReceiverMail { get; set; }

    public MailTypes MailType { get; set; }

    public string? UrlExtension { get; set; }
}
