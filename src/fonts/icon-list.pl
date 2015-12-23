#!/usr/bin/perl
use warnings;
use strict;
use utf8;
use open      qw< :std :utf8 >;
use charnames qw< :full >;
use feature   qw< unicode_strings say >;
use YAML      qw< DumpFile LoadFile >;
use Data::Dumper;





# Load this shit
my $input = LoadFile("icons.yml");


# Define icons
my $icons = {};
for my $set (keys $input){
	my $categories = $input->{$set};
	
	for my $category (keys $categories){
		my $items = $input->{$set}{$category};
		
		for my $icon (keys $items){
			my $grapheme  = $input->{$set}{$category}{$icon};
			my $codepoint;
			
			# U+#### notation
			if($grapheme =~ s/^U\+([0-9A-Fa-f]+)//){
				$codepoint = hex($1);
			}
			
			# Literal character
			elsif(length($grapheme) == 1){
				$codepoint = ord($grapheme);
			}
			
			$icons->{$codepoint} = [$icon, $category, $set];
		}
	}
}

my @indices = sort { $a <=> $b } (keys $icons);
say Dumper \@indices;
