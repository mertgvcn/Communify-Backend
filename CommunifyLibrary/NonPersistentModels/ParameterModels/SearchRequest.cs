using CommunifyLibrary.Enums;

namespace CommunifyLibrary.NonPersistentModels.ParameterModels;
public class SearchRequest
{
    public string Input { get; set; }

    public SearchTypes SearchType { get; set; }
}
