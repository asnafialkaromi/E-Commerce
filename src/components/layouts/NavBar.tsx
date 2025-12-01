import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Bell, Search, ShoppingCart, X } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router";

function NavBar() {
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const [history, setHistory] = React.useState([
    "Laptop",
    "Shoes",
    "Headphone",
  ]);

  const notifications = [
    {
      id: 1,
      title: "Order Update",
      description: "Your order #1023 has shipped.",
    },
    {
      id: 2,
      title: "Promotion",
      description: "New promo: 20% off electronics!",
    },
  ];

  // Add or move item to top without duplicates
  const addHistory = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setHistory((prev) => {
      // remove existing instance then add to front
      const filtered = prev.filter((p) => p.toLowerCase() !== v.toLowerCase());
      return [v, ...filtered];
    });
  };

  const removeHistory = (item: string) => {
    setHistory((prev) => prev.filter((h) => h !== item));
  };

  // Called when user triggers a search (Enter key or click)
  const performSearch = () => {
    const value = search.trim();
    if (!value) return;

    addHistory(value);

    navigate(`/search?q=${encodeURIComponent(value)}&page=1`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  return (
    <nav className="w-full flex sticky top-0 items-center justify-between px-6 py-3 bg-white shadow-sm z-40">
      {/* Logo */}
      <div className="text-xl font-bold">MyStore</div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 max-w-xl relative">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <InputGroupAddon>
            {/* Make the icon a button to trigger search */}
            <button
              type="button"
              aria-label="Search"
              onMouseDown={(e) => {
                // prevent input blur race
                e.preventDefault();
                performSearch();
              }}
              className="p-2 rounded hover:bg-gray-100"
            >
              <Search />
            </button>
          </InputGroupAddon>
        </InputGroup>

        {/* Search History Dropdown */}
        {searchFocused && (
          <div className="absolute w-full mt-2 bg-white shadow-lg rounded-lg border z-20 animate-in fade-in slide-in-from-top-2 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-2 border-b bg-gray-50 text-sm font-semibold text-gray-600 flex items-center justify-between">
              <span>Search History</span>
              <button
                className="text-xs text-gray-500 hover:text-gray-700"
                onMouseDown={(e) => {
                  // clear button - keep focus behaviour stable
                  e.preventDefault();
                  setHistory([]);
                }}
              >
                Clear
              </button>
            </div>

            {/* History List */}
            <div className="max-h-60 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 p-4">No history yet</p>
              ) : (
                history.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer group"
                    // use onMouseDown so click doesn't cause the input blur before we set the value
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSearch(item);
                      // optionally keep dropdown open or trigger search:
                      // performSearch();
                    }}
                  >
                    <span className="text-sm text-gray-700">{item}</span>

                    {/* Remove Icon */}
                    <button
                      onMouseDown={(e) => {
                        // prevent the parent's onMouseDown from firing
                        e.preventDefault();
                        e.stopPropagation();
                        removeHistory(item);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200"
                      aria-label={`Remove ${item}`}
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Cart */}
        <div className="relative w-fit">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="size-5" />
            <Badge className="absolute bg-red-500 top-0 right-1 h-4 min-w-1 px-1 text-xs tabular-nums">
              8
            </Badge>
          </Button>
        </div>

        {/* Notification Popover */}
        <Popover>
          <PopoverTrigger asChild>
            {/* Button with Badge */}
            <div className="relative w-fit">
              <Button variant="ghost" size="icon">
                <Bell className="size-5" />
                <Badge className="absolute bg-red-500 top-0 right-1 h-4 min-w-1 px-1 text-xs tabular-nums">
                  8
                </Badge>
              </Button>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-64 p-0 shadow-lg">
            <div className="p-3 font-semibold border-b">Notifications</div>
            <div className="max-h-60 overflow-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-3 py-2 hover:bg-gray-100 text-sm border-b last:border-none"
                >
                  {n.title}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button>Login</Button>
      </div>
    </nav>
  );
}

export default NavBar;
