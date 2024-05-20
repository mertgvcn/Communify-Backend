using CommunifyLibrary.Models;

namespace CommunifyLibrary.Repository.Interfaces;
public interface INotificationRepository
{
    IQueryable<Notification> GetAll();
    Task<Notification> GetByIdAsync(long id);
    Task<Notification> AddAsync(Notification Entity);
}
