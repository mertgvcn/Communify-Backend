using CommunifyLibrary.Models;
using CommunifyLibrary.Repository.Interfaces;

namespace CommunifyLibrary.Repository;
public class NotificationRepository(CommunifyContext context) : BaseRepository<Notification>(context), INotificationRepository
{
}
