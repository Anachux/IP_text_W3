using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Company.ClassLibrary1;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly IMapper _mapper;
    private readonly DataContext _dataContext;

    public UserRepository(IMapper mapper, DataContext dataContext)
    {
        _mapper = mapper;
        _dataContext = dataContext;
    }

    public Task<ActionResult<MemberDto?>> GetMemberAsync(string username)
    {
        throw new NotImplementedException();
    }

    public async Task<MemberDto?> GetMemberByUserNameAsync(string username)
    {
        return await _dataContext.Users
            .Where(user => user.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    // public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    // {
    //     return await _dataContext.Users
    //     .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
    //     .ToListAsync();

    // }

    public async Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams)
    {

        var minBirthDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1)); 
        var maxBirthDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
        var query = _dataContext.Users.AsQueryable();

        
        query = query.Where(user => user.BirthDate >= minBirthDate && user.BirthDate <= maxBirthDate);
        query = query.Where(user => user.UserName != userParams.CurrentUserName);
        if (userParams.Gender != "non-binary")
            query = query.Where(user => user.Gender == userParams.Gender);  
        query = userParams.OrderBy switch
        {
            "created" => query.OrderByDescending(user => user.Created),
            _ => query.OrderByDescending(user => user.LastActive),
        };
        query.AsNoTracking();
        return await PageList<MemberDto>.CreateAsync(
            query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider), 
            userParams.PageNumber, 
            userParams.PageSize);
    }

    public Task<MemberDto?> GetMember_By_user_name_Async(string username)
    {
        throw new NotImplementedException();
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await _dataContext.Users.FindAsync(id);
        //return await _dataContext.Users
        //.Where(user => user.Id == id)
        //.ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        //.SingleOrDefaultAsync();
    }

    public async Task<AppUser?> GetUserByUserNameAsync(string username)
    {
        return await _dataContext.Users
        .Include(user => user.Photos)
        .SingleOrDefaultAsync(user => user.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await _dataContext.Users
          .Include(user => user.Photos)
          .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user) => _dataContext.Entry(user).State = EntityState.Modified;

    async Task<ActionResult<MemberDto?>> IUserRepository.GetMemberByUserNameAsync(string username)
    {
        return await _dataContext.Users.Where(user => user.UserName == username)
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }
}