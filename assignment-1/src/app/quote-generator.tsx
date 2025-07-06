"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getQuotesByTopic, getAllTopics } from "./quotes-data";

const FormSchema = z.object({
  topic: z.string().min(1, {
    message: "Please enter a topic to search for quotes.",
  }),
});

interface QuoteType {
  text: string;
  author: string;
  topic: string;
}

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [searchedTopic, setSearchedTopic] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    // simulate loading delay
    setTimeout(() => {
      const foundQuotes = getQuotesByTopic(data.topic);
      setQuotes(foundQuotes);
      setSearchedTopic(data.topic);
      setIsLoading(false);
    }, 500);
  }

  const availableTopics = getAllTopics();

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Quotes by Topic
          </CardTitle>
          <CardDescription>
            Enter a topic to discover inspiring quotes. Try topics like
            motivation, success, love, or wisdom.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., motivation, success, wisdom..."
                        {...field}
                        className="text-base"
                      />
                    </FormControl>
                    <FormDescription>
                      Search for quotes on any topic that interests you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Searching..." : "Generate Quotes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">Popular topics:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {availableTopics.slice(0, 8).map((topic) => (
            <Badge
              key={topic}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => {
                form.setValue("topic", topic);
                onSubmit({ topic });
              }}
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600 mt-2">Finding the perfect quotes...</p>
        </div>
      )}

      {quotes.length > 0 && !isLoading && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Quotes about "{searchedTopic}"
            </h2>
            <p className="text-gray-600">
              Found {quotes.length} inspiring quotes
            </p>
          </div>

          <Separator />

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {quotes.map((quote, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Search className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div className="space-y-3 flex-1">
                      <blockquote className="text-lg leading-relaxed text-gray-800 italic">
                        "{quote.text}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <cite className="text-sm font-medium text-gray-600 not-italic">
                          — {quote.author}
                        </cite>
                        <Badge variant="outline" className="text-xs">
                          {quote.topic}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {quotes.length === 0 && searchedTopic && !isLoading && (
        <Card className="text-center py-8">
          <CardContent>
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quotes found for "{searchedTopic}"
            </h3>
            <p className="text-gray-600 mb-4">
              Try searching for a different topic or check out our popular
              topics above.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
                setQuotes([]);
                setSearchedTopic("");
              }}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
